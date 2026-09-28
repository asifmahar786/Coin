import { useState } from 'react';
import Papa from 'papaparse';
import { UploadCloud } from 'lucide-react';
import api from '../../api/axios';

const CSVImport = ({ categories, onImported }) => {
  const [status, setStatus] = useState('');

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        const rows = results.data
          .map((row) => {
            const category = categories.find(
              (c) => c.name.toLowerCase() === (row.category || '').toLowerCase() && c.type === row.type
            );
            if (!category || !row.amount) return null;
            return {
              type: row.type,
              category: category._id,
              amount: Number(row.amount),
              description: row.description || '',
              date: row.date || new Date().toISOString(),
            };
          })
          .filter(Boolean);

        if (rows.length === 0) {
          setStatus('No valid rows found. Check your category names match exactly.');
          return;
        }

        try {
          await api.post('/transactions/import', { rows });
          setStatus(`Imported ${rows.length} transactions.`);
          onImported();
        } catch {
          setStatus('Import failed. Please check the file and try again.');
        }
      },
    });
  };

  return (
    <div className="card">
      <label className="csv-label">
        <UploadCloud size={16} />
        Import from CSV
        <input type="file" accept=".csv" onChange={handleFile} className="csv-input-hidden" />
      </label>
      <p className="csv-hint">Columns: type, category, amount, description, date</p>
      {status && <p className="csv-status">{status}</p>}
    </div>
  );
};

export default CSVImport;
