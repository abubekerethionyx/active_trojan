import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Tab,
  Tabs,
  Box,
} from "@mui/material";
import { API_URL } from "../constants/Constants";

interface CsvDialogProps {
  open: boolean;
  onClose: () => void;
}

const CsvDialog: React.FC<CsvDialogProps> = ({ open, onClose }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [file, setFile] = useState<File | null>(null);
  const [filePath, setFilePath] = useState<string>("");
  const [docId, setDocId] = useState<string>("");
  const [apiKey, setApiKey] = useState<string>("");
  const [oauthToken, setOauthToken] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue);
  };

  // Handle CSV Upload from File
  const handleUploadFile = async () => {
    if (!file) {
      alert("Please upload a file.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch(`${API_URL}/api/upload-csv`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload CSV.");
      }

      const result = await response.json();
      alert("CSV uploaded successfully!");
    } catch (err: any) {
      setError(err.message || "Error uploading CSV file.");
    } finally {
      setLoading(false);
    }
  };

  // Handle CSV Upload from File Path
  const handleUploadFilePath = async () => {
    if (!filePath) {
      alert("Please provide a file path.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/upload-file-path`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filePath }),
      });

      if (!response.ok) {
        throw new Error("Failed to upload CSV from file path.");
      }

      const result = await response.json();
      alert("CSV retrieved from file path successfully!");
    } catch (err: any) {
      setError(err.message || "Error uploading CSV from file path.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Google Docs CSV Retrieval
  const handleRetrieveCsv = async () => {
    if (!docId || !apiKey || !oauthToken) {
      alert(
        "Please fill in all fields: Document ID, API Key, and OAuth Token."
      );
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/retrieve-google-docs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ documentId: docId, apiKey, oauthToken }),
      });

      if (!response.ok) {
        throw new Error("Failed to retrieve CSV from Google Docs.");
      }

      const result = await response.json();
      alert("CSV retrieved successfully from Google Docs!");
    } catch (err: any) {
      setError(err.message || "Error retrieving CSV from Google Docs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>CSV Upload Options</DialogTitle>
      <DialogContent>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Upload File" />
          <Tab label="File Path" />
          <Tab label="Google Docs" />
        </Tabs>

        {activeTab === 0 && (
          <Box mt={2}>
            <Typography variant="body1">Upload CSV File:</Typography>
            <input
              type="file"
              accept=".csv"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </Box>
        )}

        {activeTab === 1 && (
          <Box mt={2}>
            <Typography variant="body1">Enter File Path:</Typography>
            <TextField
              label="File Path"
              variant="outlined"
              fullWidth
              value={filePath}
              onChange={(e) => setFilePath(e.target.value)}
              margin="normal"
            />
          </Box>
        )}

        {activeTab === 2 && (
          <Box mt={2}>
            <Typography variant="body1">
              Retrieve CSV from Google Docs:
            </Typography>
            <TextField
              label="Document ID"
              variant="outlined"
              fullWidth
              value={docId}
              onChange={(e) => setDocId(e.target.value)}
              margin="normal"
            />
            <TextField
              label="API Key"
              variant="outlined"
              fullWidth
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              margin="normal"
            />
            <TextField
              label="OAuth Token"
              variant="outlined"
              fullWidth
              value={oauthToken}
              onChange={(e) => setOauthToken(e.target.value)}
              margin="normal"
            />
          </Box>
        )}

        {loading && <CircularProgress />}
        {error && <Typography color="error">{error}</Typography>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        {activeTab === 0 && (
          <Button onClick={handleUploadFile} color="primary" disabled={loading}>
            Upload CSV
          </Button>
        )}
        {activeTab === 1 && (
          <Button
            onClick={handleUploadFilePath}
            color="primary"
            disabled={loading}
          >
            Upload File Path
          </Button>
        )}
        {activeTab === 2 && (
          <Button
            onClick={handleRetrieveCsv}
            color="primary"
            disabled={loading}
          >
            Retrieve CSV
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CsvDialog;
