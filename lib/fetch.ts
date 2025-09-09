export const FetchClient = async ({
  url,
  data,
  method = "GET",
  headers,
}: {
  method: string;
  url: string;
  data: Record<any, any>;
  headers?: any;
}) => {
  try {
    const response = await fetch(url, {
      method: method || "POST",
      body: method === "GET" ? null : JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });

    if (!response.ok) {
      throw new Error(JSON.stringify(response));
    }

    const requestData = await response.json();

    return { data: requestData, error: null };
  } catch (error) {
    console.error("Fetch error:", error);
    return { data: null, error: `request err: ${error}` };
  }
};
