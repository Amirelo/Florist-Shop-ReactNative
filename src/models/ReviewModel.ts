class ReviewModel {
  id: string;
  name: string;
  userImage: string;
  comment: string;
  date: string;
  description: string;
  images: Array<string>;

  constructor(
    id: string,
    name: string,
    userImage: string,
    comment: string,
    date: string,
    description: string,
    images: Array<string>,
  ) {
    this.id = id;
    this.name = name;
    this.userImage = userImage;
    this.comment = comment;
    this.date = date;
    this.description = description;
    this.images = images;
  }
}
