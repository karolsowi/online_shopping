import { Request, Response } from "express";
import { handler } from "../utils/utils";
import { UserModel } from "../models";

export async function deleteUserController(
  request: Request,
  response: Response
) {
  handler(request, response, async () => {
    const user = await UserModel.findById(request.params.id);
    if (user) {
      if (user.email === "admin@admin.com") {
        response.status(400).send({ message: "Nie można usunąć administratora" });
        return;
      }
      const deleteUser = await user.deleteOne();
      return { user: deleteUser };
    } else {
      throw new Error("Nie znaleziono użytkownika");
    }
  });
}
