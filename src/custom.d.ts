type RecordItem = {
    //ts类型声明，只关心类型
    tags: string[]; //?:则表示可以不存在
    notes: string;
    type: string;
    amount: number;
    createdAt?: Date; //除了写类型外，还可以写类（构造函数），类是对object的分类
}
type Tag = {
    id: string;
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
interface Window {

    tagList: Tag[];
    findTag: (string) => Tag | undefined;
    createTag: (string) => void;
    removeTag: (string) => boolean;
    // updateTag: (string, string) => 'success' | 'notFound' | 'duplicated';
    updateTag: TagListModel['update'];

    recordList: RecordItem[];
    createRecord: (RecordItem) => void;
}