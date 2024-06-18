// components/FileViewer.jsx
import { Button, Card, Flex, Loader, Paper } from '@mantine/core';
import { IconFolder } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

const FileViewer = ({ initialDirectory = '', value, onChange }) => {
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

    const handleFileClick = (filePath) => {
        if (onChange) {
            onChange(filePath);
        }
    };

    if (loading) return <Loader color='blue' />;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h4>{currentPath || ""}</h4>
            <Button variant='transparent' onClick={handleParentDirectoryClick} disabled={!currentPath}>
                Назад
            </Button>
            <Paper>
                {files.map((file, index) => (
                    <Card key={index}>
                        {file.type === 'directory' ? (
                            <Flex align={'center'} gap={8} onClick={() => handleDirectoryClick(file.name)}>
                                <IconFolder />
                                {file.name}
                            </Flex>
                        ) : (
                            <Flex align={'center'} gap={8} onClick={() => handleFileClick(`${currentPath}/${file.path}`)} style={{ cursor: 'pointer' }}>
                                <img width={16} height={16} src={`api/file?filePath=${`/${file.path}`}`}></img>
                                <p>{file.name}</p>
                            </Flex>
                        )}
                    </Card>
                ))}
            </Paper>
        </div>
    );
};

export default FileViewer;