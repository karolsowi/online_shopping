import Button from "react-bootstrap/Button";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoadingBox } from "../components/LoadingBox";
import { MessageBox } from "../components/MessageBox";
import { getError } from "../utils/utils";
import { ApiErrorType } from "../types/ApiError";
import { UserType } from "../types/User";
import { useDeleteUserMutation, useGetUsersQuery } from "../hooks/userHooks";

export function UserListPage() {
  const navigate = useNavigate();
  const { data: users, isLoading, error, refetch } = useGetUsersQuery();
  const { mutateAsync: deleteUser, isLoading: loadingDelete } =
    useDeleteUserMutation();
  async function deleteHandler(id: string) {
    if (window.confirm("Are you sure to delete?")) {
      try {
        await deleteUser(id);
        await refetch();
        toast.success("Order deleted successfully");
      } catch (err) {
        toast.error(getError(err as ApiErrorType));
      }
    }
  }

  return (
    <div>
      <Helmet>
        <title>Użytkownicy</title>
      </Helmet>
      <h1>Użytkownicy</h1>

      {loadingDelete && <LoadingBox></LoadingBox>}
      {isLoading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">
          {getError(error as ApiErrorType)}
        </MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAZWA</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th>OPCJE</th>
            </tr>
          </thead>
          <tbody>
            {users!.map((user: UserType) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? "TAK" : "NIE"}</td>
                <td>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() => navigate(`/admin/user/${user._id}`)}
                  >
                    Edytuj
                  </Button>
                  &nbsp;
                  <Button
                    type="button"
                    variant="light"
                    onClick={() => deleteHandler(user._id)}
                  >
                    Usuń
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
