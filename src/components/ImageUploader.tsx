"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function ImageUploader() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [tone, setTone] = useState("professional");
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
    setCaption("");
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const generateCaption = async () => {
  if (!imageFile) return;

  setLoading(true);
  setCaption("");

  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("tone", tone);

  try {
    const response = await fetch("/api/caption", {
      method: "POST",
      body: formData,
    });

    // Check if the response is actually JSON
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      if (data.caption) {
        setCaption(data.caption);
      } else {
        setCaption(`Server error: ${data.error || "Unknown error"}`);
      }
    } else {
      
      const rawText = await response.text();
      console.error("Received non-JSON response:", rawText);
      setCaption("The AI server returned an error page. Check terminal for details.");
    }
  } catch (error) {
    setCaption("Error: Could not connect to the API.");
  }

  setLoading(false);
};

  return (
    <div className="mt-4">

      {/* Drag & Drop */}
      <div
        {...getRootProps()}
        className={`border p-5 text-center rounded ${
          isDragActive ? "bg-light" : ""
        }`}
        style={{ cursor: "pointer" }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the image here...</p>
        ) : (
          <p>Drag & drop an image here, or click to select</p>
        )}
      </div>

      {/* Preview */}
      {preview && (
        <div className="mt-4 text-center">
          <img
            src={preview}
            alt="Preview"
            className="img-fluid rounded"
            style={{ maxHeight: "400px" }}
          />
        </div>
      )}

      {/* Tone Selector */}
      <div className="mt-4">
        <label className="form-label">Tone</label>
        <select
          className="form-select"
          value={tone}
          onChange={(e) => setTone(e.target.value)}
        >
          <option value="professional">Professional</option>
          <option value="funny">Funny</option>
          <option value="creative">Creative</option>
        </select>
      </div>

      {/* Generate Button */}
      <button
        className="btn btn-primary mt-3"
        disabled={!imageFile || loading}
        onClick={generateCaption}
      >
        {loading ? "Generating..." : "Generate Caption"}
      </button>

      {/* Output */}
      {caption && (
        <div className="alert alert-secondary mt-4">
          <strong>Caption:</strong>
          <p className="mb-2">{caption}</p>

          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => navigator.clipboard.writeText(caption)}
          >
            Copy to Clipboard
          </button>
        </div>
      )}
    </div>
  );
}
