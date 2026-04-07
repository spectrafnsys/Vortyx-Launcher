import axios from "axios";
import { Config } from "@/app/config/config";

export class RuntimeInit {
  public status: "pending" | "valid" | "invalid" = "pending";

  constructor(private url = "http://127.0.0.1:3900") {}

  async init(): Promise<"valid" | "invalid"> {
    const authKey = Config.AUTH_KEY;
    if (!authKey) {
      this.status = "invalid";
      return "invalid";
    }

    try {
      const response = await axios.get(`${this.url}/actinium/v1/api/key`, {
        params: { key: authKey },
      });

      if (response.data.status === "valid") {
        this.status = "valid";
        return "valid";
      } else {
        this.status = "invalid";
        return "invalid";
      }
    } catch (err) {
      console.error("Key validation error:", err);
      this.status = "invalid";
      return "invalid";
    }
  }
}
