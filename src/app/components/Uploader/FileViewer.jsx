// components/FileViewer.jsx
import { useEffect, useState } from 'react';

const FileViewer = ({ initialDirectory = '' }) => {
    const [currentPath, setCurrentPath] = useState(initialDirectory);
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchFiles(directoryPath) {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`/api/file/list?directoryPath=${encodeURIComponent(directoryPath)}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setFiles(data.files);
            } catch (error) {
                setError(error.message || 'Failed to fetch files');
            }

            setLoading(false);
        }

        fetchFiles(currentPath);
    }, [currentPath]);

    const handleDirectoryClick = (directory) => {
        setCurrentPath((prevPath) => {
            if (prevPath) {
                return `${prevPath}/${directory}`;
            } else {
                return directory;
            }
        });
    };

    const handleParentDirectoryClick = () => {
        setCurrentPath((prevPath) => {
            const parentPath = prevPath.split('/').slice(0, -1).join('/');
            return parentPath || '';
        });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Files in {currentPath || 'root'}</h2>
            <button onClick={handleParentDirectoryClick} disabled={!currentPath}>
                Go Up
            </button>
            <ul>
                {files.map((file, index) => (
                    <li key={index}>
                        {file.type === 'directory' ? (
                            <button onClick={() => handleDirectoryClick(file.name)}>{file.name} (Folder)</button>
                        ) : (
                            <span>{file.name}</span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FileViewer;