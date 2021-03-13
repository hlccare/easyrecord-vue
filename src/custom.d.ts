type RecordItem = {
    //ts类型声明，只关心类型
    tags: string[]; //?:则表示可以不存在
    notes: string;
    type: string;
    amount: number;
    createdAt?: Date; //除了写类型外，还可以写类（构造函数），类是对object的分类
}