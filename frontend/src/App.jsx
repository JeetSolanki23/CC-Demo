import { useEffect, useState } from "react";

const FRONTEND_VERSION = "v1.0";

const getBackendUrl = () => {
  const url = import.meta.env.VITE_BACKEND_URL;
  return url ? url.replace(/\/$/, "") : "";
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    const baseUrl = getBackendUrl();
    if (!baseUrl) {
      setError("Missing VITE_BACKEND_URL in the frontend environment.");
      setLoading(false);
      return;
    }

    fetch(`${baseUrl}/api/hello`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Request failed.");
        setLoading(false);
      });
  }, []);

  return (
    <main className="page">
      <section className="card">
        <h1>Hello Students</h1>
        <p className="subhead">Frontend Version: {FRONTEND_VERSION}</p>

        <h2>Message from Backend</h2>
        {loading && <p>Loading backend response...</p>}
        {!loading && error && <p className="error">{error}</p>}
        {!loading && !error && data && (
          <div className="result">
            <p>{data.message}</p>
            <p>API Version: {data.version}</p>
            <p>Status: {data.status}</p>
          </div>
        )}
      </section>
    </main>
  );
}
