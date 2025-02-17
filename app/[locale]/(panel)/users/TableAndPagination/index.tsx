import { Prisma, User } from "@prisma/client";
import UserModel from "@/models/UserModel";
import Table from "./Table";
// import Pagination from "@/components/Pagination";

type TableAndPaginationProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const RESULTS_PER_PAGE = 30;
const DEFAULT_SORT_BY = "createdAt";
const DEFAULT_SORT_DIRECTION: Prisma.SortOrder = "desc";
const DEFAULT_PAGE = 1;

const TableAndPagination = async ({
  searchParams,
}: TableAndPaginationProps) => {
  const searchParamsObj = await searchParams;
  const page =
    typeof searchParamsObj?.page === "string"
      ? parseInt(searchParamsObj?.page)
      : DEFAULT_PAGE;

  const orderDirection =
    typeof searchParamsObj?.sort_direction === "string" &&
    ["asc", "desc"].includes(searchParamsObj?.sort_direction)
      ? (searchParamsObj?.sort_direction as Prisma.SortOrder)
      : DEFAULT_SORT_DIRECTION;

  const orderBy =
    typeof searchParamsObj?.sort_by === "string"
      ? (searchParamsObj?.sort_by as keyof User)
      : DEFAULT_SORT_BY;

  const userModel = new UserModel();
  const usersResult = await userModel.getPaginatedRecords({
    page,
    resultsPerPage: RESULTS_PER_PAGE,
    orderDirection,
    orderBy,
  });

  const users = usersResult.data.map((user) => {
    return {
      ...user,
      createdAt: `${user.createdAt.getDate()}.${
        user.createdAt.getMonth() + 1
      }.${user.createdAt.getFullYear()}`,
    };
  });

  return (
    <>
      <Table
        users={users}
        defaultSortedBy={DEFAULT_SORT_BY}
        defaultSortedDirection={DEFAULT_SORT_DIRECTION}
      />
    </>
  );
};

export default TableAndPagination;
