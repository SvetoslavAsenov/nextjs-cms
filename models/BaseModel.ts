export default class BaseModel<
  TCreateArgs,
  TDeleteArgs,
  TFindUniqueArgs,
  TFindFirstArgs,
  TFindManyArgs,
  TUpdateArgs,
  TReturn
> {
  private createFunc;
  private deleteFunc;
  private findUniqueFunc;
  private findFirstFunc;
  private findManyFunc;
  private updateFunc;

  constructor(prismaModel: {
    create: (args: TCreateArgs) => Promise<TReturn>;
    delete: (args: TDeleteArgs) => Promise<TReturn>;
    findUnique: (args: TFindUniqueArgs) => Promise<TReturn | null>;
    findFirst: (args: TFindFirstArgs) => Promise<TReturn | null>;
    findMany: (args: TFindManyArgs) => Promise<TReturn[]>;
    update: (args: TUpdateArgs) => Promise<TReturn>;
  }) {
    this.createFunc = prismaModel.create;
    this.deleteFunc = prismaModel.delete;
    this.findUniqueFunc = prismaModel.findUnique;
    this.findFirstFunc = prismaModel.findFirst;
    this.findManyFunc = prismaModel.findMany;
    this.updateFunc = prismaModel.update;
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
}
