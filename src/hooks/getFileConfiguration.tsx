import { useState, useEffect } from "react";
import AuthService from "../services/api";
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
  const [data, setData] = useState<ApiResponse>({
    filePublished: {},
    fileEdition: {},
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let fileEditionData = await getFileData(token, "edition");
        let filePublishedData = await getFileData(token, "published");
        if (fileEditionData && filePublishedData) {
          setData({
            fileEdition: fileEditionData,
            filePublished: filePublishedData,
          });
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

const getFileData = async (
  token: string,
  type: string
): Promise<File | null> => {
  try {
    const response = await AuthService.files(token, {
      type,
    });
    if (response.data) {
      return response.data.data;
    }
    return null;
  } catch (error: any) {
    console.error(error);
    throw new Error("Erro ao obter dados do arquivo.");
  }
};
export default getFileConfig;
