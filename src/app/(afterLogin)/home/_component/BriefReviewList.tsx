import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";

export default function BriefReviewList() {
  const data = {
    id: 1,
    createAt: new Date(),
    rating: 4.5,
    pros: "범죄뿐만 아니라 사회의 어두운 면을 비판적으로 다루어 사회적 메시지를 전달합니다.",
    cons: "일부 플롯 트위스트가 예측 가능하여 긴장감을 떨어뜨릴 수 있습니다.",
    movie: {
      id: 1242,
      title: "도둑들",
      openDate: "2012-07-25",
    },
    author: {},
  };

  return (
    <>
      <div key={data.id}>
        <span>{data.createAt.toLocaleDateString()}</span>
        <h3>
          {data.movie.title} <span>{data.rating}</span>
        </h3>
        <div>
          <FaThumbsUp />
          <p>{data.pros}</p>
        </div>
        <div>
          <FaThumbsDown />
          <p>{data.cons}</p>
        </div>
      </div>
    </>
  );
}
