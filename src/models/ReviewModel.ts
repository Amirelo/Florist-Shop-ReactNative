class ReviewModel {
  id: string;
  name: string;
  userImage: string;
  rating: number;
  date: string;
  description: string;
  images: Array<string>;

  constructor(
    id: string,
    name: string,
    userImage: string,
    rating: number,
    date: string,
    description: string,
    images: Array<string>,
  ) {
    this.id = id;
    this.name = name;
    this.userImage = userImage;
    this.rating = rating;
    this.date = date;
    this.description = description;
    this.images = images;
  }
}

export default ReviewModel