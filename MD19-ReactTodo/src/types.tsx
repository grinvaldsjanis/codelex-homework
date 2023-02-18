export interface TaskType {
    _id: string;
    title: string;
    priority: ("highest" | "high" | "moderate" | "low");
    done: boolean;
    createdAt: Date;
    updatedAt: Date;
  }