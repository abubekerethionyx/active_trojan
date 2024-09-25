interface ReviewItem {
  review_id: string;
  rating: number;
  published_at: string;
  review_likes_count: number;
  review_text: string;
}

interface Display {
  type: string;
  title: string;
  x_axis: string;
  y_axis: string;
}

interface ReviewData {
  result: ReviewItem[];
  display: Display;
  success?: boolean;
}
