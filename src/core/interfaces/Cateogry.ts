export interface Cateogry {
 id:string,
  name: string,
  description: string,
  reportCategory: string,
  wetOrDry: string,
  showonTill: boolean,
  nominalCode: string,
  popupNoteId: string,

  parentId?:string,
 
}