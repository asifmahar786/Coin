const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

/* =====================================================
   ERROR HELPER
===================================================== */

const badRequest = (message) => {
  const err = new Error(message);
  err.statusCode = 400;
  return err;
};

/* =====================================================
   VERCEL-COMPATIBLE MEMORY STORAGE
===================================================== */

const storage = multer.memoryStorage();

/* =====================================================
   FILE FILTER
===================================================== */

const fileFilter = (req, file, cb) => {
  const extension = path
    .extname(file.originalname)
    .toLowerCase();

  const isCsvExtension = extension === ".csv";

  const allowedMimeTypes = [
    "text/csv",
    "application/vnd.ms-excel",
    "text/plain",
    "application/csv",
    "text/x-csv",
  ];

  const isCsvMimeType =
    allowedMimeTypes.includes(file.mimetype);

  if (!isCsvExtension) {
    return cb(
      badRequest("Only CSV files are allowed")
    );
  }

  if (!isCsvMimeType) {
    return cb(
      badRequest("Invalid CSV file type")
    );
  }

  cb(null, true);
};

/* =====================================================
   MULTER CONFIGURATION
===================================================== */

const upload = multer({
  storage: storage,

  fileFilter: fileFilter,

  limits: {
    fileSize: 2 * 1024 * 1024,
    files: 1,
  },
}).single("file");

/* =====================================================
   CSV CONTENT VALIDATION
===================================================== */

const looksLikeCsv = (buffer) => {
  try {
    if (!buffer) {
      return false;
    }

    if (!Buffer.isBuffer(buffer)) {
      return false;
    }

    if (buffer.length === 0) {
      return false;
    }

    /*
      Only inspect first 512 bytes.
    */

    const chunk = buffer.subarray(
      0,
      Math.min(buffer.length, 512)
    );

    /*
      Binary file check
    */

    const hasNullByte = chunk.includes(0);

    /*
      PDF signature check
    */

    const isPdf =
      chunk.toString("latin1", 0, 4) === "%PDF";

    if (hasNullByte || isPdf) {
      return false;
    }

    /*
      Convert sample to text
    */

    const text = chunk.toString("utf8");

    /*
      CSV should normally contain:
      - comma
      - semicolon
      - tab
      OR simply readable text
    */

    const hasCsvSeparator =
      text.includes(",") ||
      text.includes(";") ||
      text.includes("\t");

    /*
      If the file is readable text but has no separator,
      we still allow it because some CSV files contain
      a single column.
    */

    const hasReadableText =
      text.trim().length > 0;

    return (
      hasReadableText &&
      (hasCsvSeparator || hasReadableText)
    );

  } catch (error) {
    console.error(
      "CSV validation error:",
      error.message
    );

    return false;
  }
};

/* =====================================================
   UPLOAD MIDDLEWARE
===================================================== */

const uploadMiddleware = (req, res, next) => {

  upload(req, res, (err) => {

    /* -----------------------------------------------
       MULTER ERROR
    ------------------------------------------------ */

    if (err) {

      console.error(
        "Multer upload error:",
        err.message
      );

      return next(err);
    }

    /* -----------------------------------------------
       NO FILE
    ------------------------------------------------ */

    if (!req.file) {

      return next(
        badRequest(
          "Please upload a CSV file"
        )
      );
    }

    /* -----------------------------------------------
       VALIDATE CSV CONTENT
    ------------------------------------------------ */

    const isValidCsv =
      looksLikeCsv(req.file.buffer);

    if (!isValidCsv) {

      return next(
        badRequest(
          "File content is not a valid CSV"
        )
      );
    }

    /* -----------------------------------------------
       GENERATE UNIQUE FILE NAME
    ------------------------------------------------ */

    const uniqueSuffix =
      `${Date.now()}-${crypto
        .randomBytes(8)
        .toString("hex")}`;

    const generatedFilename =
      `${uniqueSuffix}.csv`;

    /* -----------------------------------------------
       ADD EXTRA INFORMATION TO req.file
    ------------------------------------------------ */

    req.file.generatedFilename =
      generatedFilename;

    req.file.originalExtension =
      path.extname(
        req.file.originalname
      ).toLowerCase();

    /*
      File data is available here:

      req.file.buffer

      Example:

      const csvText =
        req.file.buffer.toString("utf8");
    */

    next();
  });
};

/* =====================================================
   EXPORT
===================================================== */

module.exports = uploadMiddleware;