export default class BaseModel<
  TCreateArgs,
  TDeleteArgs,
  TFindUniqueArgs,
  TFindFirstArgs,
  TFindManyArgs extends {
    skip?: number;
    take?: number;
    orderBy?: TOrderBy | TOrderBy[];
    include?: TInclude;
  },
  TUpdateArgs,
  TOrderBy extends object,
  TReturn,
  TInclude = unknown
> {
  private createFunc: (args: TCreateArgs) => Promise<TReturn>;
  private deleteFunc: (args: TDeleteArgs) => Promise<TReturn>;
  private findUniqueFunc: (args: TFindUniqueArgs) => Promise<TReturn | null>;
  private findFirstFunc: (args: TFindFirstArgs) => Promise<TReturn | null>;
  private findManyFunc: (args: TFindManyArgs) => Promise<TReturn[]>;
  private updateFunc: (args: TUpdateArgs) => Promise<TReturn>;
  private countFunc: () => Promise<number>;

  protected constructor(prismaModel: {
    create: (args: TCreateArgs) => Promise<TReturn>;
    delete: (args: TDeleteArgs) => Promise<TReturn>;
    findUnique: (args: TFindUniqueArgs) => Promise<TReturn | null>;
    findFirst: (args: TFindFirstArgs) => Promise<TReturn | null>;
    findMany: (args: TFindManyArgs) => Promise<TReturn[]>;
    update: (args: TUpdateArgs) => Promise<TReturn>;
    count: () => Promise<number>;
  }) {
    this.createFunc = prismaModel.create;
    this.deleteFunc = prismaModel.delete;
    this.findUniqueFunc = prismaModel.findUnique;
    this.findFirstFunc = prismaModel.findFirst;
    this.findManyFunc = prismaModel.findMany;
    this.updateFunc = prismaModel.update;
    this.countFunc = prismaModel.count;
  }

  public async create(args: TCreateArgs): Promise<TReturn> {
    return this.createFunc(args);
  }

  public async delete(args: TDeleteArgs): Promise<TReturn> {
    return this.deleteFunc(args);
  }

  public async findUnique(args: TFindUniqueArgs): Promise<TReturn | null> {
    return this.findUniqueFunc(args);
  }

  public async findFirst(args: TFindFirstArgs): Promise<TReturn | null> {
    return this.findFirstFunc(args);
  }

  public async findMany(args: TFindManyArgs): Promise<TReturn[]> {
    return this.findManyFunc(args);
  }

  public async update(args: TUpdateArgs): Promise<TReturn> {
    return this.updateFunc(args);
  }

  public async count(): Promise<number> {
    return this.countFunc();
  }

  public async getPaginatedRecords({
    page,
    resultsPerPage,
    orderBy,
    orderDirection,
    include,
  }: {
    page: number;
    resultsPerPage: number;
    orderBy: keyof TReturn | `${string}.${string}`;
    orderDirection: "asc" | "desc";
    include?: TInclude;
  }): Promise<{
    data: TReturn[];
    pagination: {
      currentPage: number;
      totalPages: number;
      resultsPerPage: number;
      totalCount: number;
    };
  }> {
    const skip = (page - 1) * resultsPerPage;
    const take = resultsPerPage;

    let orderByObj: TOrderBy;
    if (typeof orderBy === "string" && orderBy.includes(".")) {
      const [relation, field] = orderBy.split(".");
      orderByObj = { [relation]: { [field]: orderDirection } } as TOrderBy;
    } else {
      orderByObj = { [orderBy]: orderDirection } as unknown as TOrderBy;
    }

    const query = {
      skip,
      take,
      orderBy: orderByObj,
      ...(include !== undefined ? { include } : {}),
    } as TFindManyArgs;

    const records = await this.findManyFunc(query);
    const totalCount = await this.countFunc();

    return {
      data: records,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalCount / resultsPerPage),
        resultsPerPage,
        totalCount,
      },
    };
  }
}
