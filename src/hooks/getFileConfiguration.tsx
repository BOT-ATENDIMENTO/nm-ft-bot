import { useState, useEffect } from 'react';
import { api } from '../services/api';


interface File {
    filename: string;
    data: any;
}

interface ApiResponse {
    filePublished: any;
    fileEdition: any;
}

interface ApiHookResult {
    data: ApiResponse | any;
    loading: boolean;
    error: string | null;
}

const getFileConfig = (token: string | any): ApiHookResult => {
    const [data, setData] = useState<ApiResponse>({ filePublished: {}, fileEdition: {} });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.post(`/bots/find/${token}`);
                if (response.data.bots) {
                    const files = response.data.bots.files;
                    const filePublished = files.find((item: any) => item.type === 'published');
                    const fileEdition = files.find((item: any) => item.type === 'edition');
                    if (fileEdition) {
                        const fileEditionData = await getFileData(token, fileEdition.filename);
                        if (fileEditionData) {
                            setData((prevData) => ({
                                ...prevData!,
                                fileEdition: fileEditionData ? {
                                    filename: fileEditionData.filename ?? '',
                                    data: fileEditionData.data
                                } : null
                            }));
                        }
                    }
                    if (filePublished) {
                        const filePublishedData = await getFileData(token, filePublished.filename);
                        setData((prevData) => ({
                            ...prevData!,
                            filePublished: filePublishedData
                                ? { filename: filePublishedData.filename ?? '', data: filePublishedData.data }
                                : null
                        }));
                    }
                }
            } catch (error: any) {
                console.error(error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [token]);

    return { data, loading, error };
};

const getFileData = async (token: string, filename: string): Promise<File | null> => {
    try {
        const response = await api.post(`/files/get-file-config/${token}`, { filename });
        if (response.data) {
            return { filename, data: response.data.data };
        }
        return null;
    } catch (error: any) {
        console.error(error);
        throw new Error('Erro ao obter dados do arquivo.');
    }
};
export default getFileConfig;
