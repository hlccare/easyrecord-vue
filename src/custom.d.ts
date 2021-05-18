type TagsListItem = {
    id: number;
    iconName: string;
    name: string;
}

type RootState = {
    recordList: RecordItem[];
    createRecordError: Error | null;
    createTagError: Error | null;
    tagList: Tag[];
    currentTag?: Tag;
    expenseTagsList: TagsListItem[];
    incomeTagsList: TagsListItem[];
}

type RecordItem = {
    id: number;
    tagId: number; //?:则表示可以不存在
    notes: string;
    type: '+' | '-';
    amount: number;
    createdAt?: string; //除了写类型外，还可以写类（构造函数），类是对object的分类
}
type Tag = {
    iconName: string;
    name: string;
}
type TagListModel = {
    data: Tag[];
    fetch: () => Tag[];
    create: (name: string) => 'success' | 'duplicated'; //联合类型，类似于枚举
    update: (id: string, name: string) => 'success' | 'notFound' | 'duplicated';
    remove: (id: string) => boolean;
    save: () => void;
}