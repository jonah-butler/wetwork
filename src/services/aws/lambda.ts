const ENDPOINT = process.env.VUE_APP_EMAIL_LAMBDA as string;

export interface SendEmailPayload {
  subject: string;
  message: string;
  returnAddress: string;
  from: string;
}

interface SendEmailResponse {
  success: string;
}

export const sendEmail = async (payload: SendEmailPayload): Promise<SendEmailResponse> => {
  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log("THE RESULT", result);
    return result as SendEmailResponse;
  } catch (err) {
    console.log("got an error: ", err);
    throw new Error((err as Error).message);
  }
};