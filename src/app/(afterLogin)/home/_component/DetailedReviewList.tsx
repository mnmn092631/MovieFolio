import styles from "./detailedReviewList.module.scss";

export default function DetailedReviewList() {
  const data = {
    id: 1,
    title: "보는 맛이 짜릿한 범죄 액션 영화 추천",
    createAt: new Date(),
    watchedAt: "2024-01-26",
    place: "집",
    rating: 4.3,
    storyline:
      "한 팀으로 활동 중인 한국의 도둑 뽀빠이와 예니콜, 씹던껌, 잠파노. 미술관을 터는데 멋지게 성공한 이들은 뽀빠이의 과거 파트너였던 마카오박이 제안한 홍콩에서의 새로운 계획을 듣게 된다. 여기에 마카오박이 초대하지 않은 손님, 감옥에서 막 출소한 금고털이 팹시가 합류하고 5명은 각자 인생 최고의 반전을 꿈꾸며 홍콩으로 향한다. 홍콩에서 한국 도둑들을 기다리고 있는 4인조 중국도둑 첸, 앤드류, 쥴리, 조니. 최고의 전문가들이 세팅된 가운데 서로에 대한 경계를 늦추지 않는 한국과 중국의 도둑들. 팽팽히 흐르는 긴장감 속에 나타난 마카오박은 자신이 계획한 목표물을 밝힌다. 그것은 마카오 카지노에 숨겨진 희대의 다이아몬드 <태양의 눈물>. 성공을 장담할 수 없는 위험천만한 계획이지만 2천만 달러의 달콤한 제안을 거부할 수 없는 이들은 태양의 눈물을 훔치기 위한 작업에 착수한다. 그러나 진짜 의도를 알 수 없는 비밀스런 마카오박과 그런 마카오박의 뒤통수를 노리는 뽀빠이, 마카오박에게 배신당한 과거의 기억을 잊지 못하는 팹시와 팀보다 눈 앞의 현찰을 먼저 챙기는 예니콜, 그리고 한국 도둑들을 믿지 않는 첸과 중국 도둑들까지. 훔치기 위해 모였지만 목적은 서로 다른 10인의 도둑들은 서서히 자신만의 플랜을 세우기 시작하는데…",
    quotes: "당신 잘못이 아니야. 내가 꿈을 잘못 샀어",
    review:
      "《도둑들》은 한국의 흥행 히트를 기록한 범죄 액션 영화로, 극적인 스토리텔링과 풍부한 액션 장면으로 유명합니다. 감독 김지운의 연출과 이병헌, 김윤석, 이정재 등의 역할이 돋보이며, 다양한 캐릭터와 예상치 못한 전개가 관객들의 호응을 얻었습니다. 특히, 역동적인 액션 장면과 유머러스한 대사가 결합되어 긴장감과 웃음을 동시에 선사하여 극적인 재미를 제공합니다. 전반적으로 흥미진진한 이야기와 훌륭한 연기력, 역동적인 액션으로 관객들에게 즐거운 시간을 선사하는 영화로 평가되었습니다.",
    movie: {
      id: 6242,
      title: "도둑들",
      openDate: "2012-07-25",
      nations: "대한민국",
      watchGrade: "15세 관람가",
      genre: "범죄, 액션, 드라마",
      time: "135분",
    },
    author: {},
  };

  return (
    <div className={styles.container}>
      <div key={data.id} className={styles.listCard}>
        <h3>
          {data.movie.title} <span>{data.rating}</span>
        </h3>
        <div className={styles.title}>
          <h2>{data.title}</h2>
          <span>{data.createAt.toLocaleDateString()}</span>
        </div>
        <div className={styles.content}>
          <p>
            <strong>quotes</strong>
            <span>{data.quotes}</span>
          </p>
          <p>
            <strong>storyline</strong>
            <span>{data.storyline}</span>
          </p>
          <p>
            <strong>review</strong>
            <span>{data.review}</span>
          </p>
        </div>
      </div>

      <div key={data.id} className={styles.listCard}>
        <h3>
          {data.movie.title} <span>{data.rating}</span>
        </h3>
        <div className={styles.title}>
          <h2>{data.title}</h2>
          <span>{data.createAt.toLocaleDateString()}</span>
        </div>
        <div className={styles.content}>
          <p>
            <strong>quotes</strong>
            <span>{data.quotes}</span>
          </p>
          <p>
            <strong>storyline</strong>
            <span>{data.storyline}</span>
          </p>
          <p>
            <strong>review</strong>
            <span>{data.review}</span>
          </p>
        </div>
      </div>

      <div key={data.id} className={styles.listCard}>
        <h3>
          {data.movie.title} <span>{data.rating}</span>
        </h3>
        <div className={styles.title}>
          <h2>{data.title}</h2>
          <span>{data.createAt.toLocaleDateString()}</span>
        </div>
        <div className={styles.content}>
          <p>
            <strong>quotes</strong>
            <span>{data.quotes}</span>
          </p>
          <p>
            <strong>storyline</strong>
            <span>{data.storyline}</span>
          </p>
          <p>
            <strong>review</strong>
            <span>{data.review}</span>
          </p>
        </div>
      </div>

      <div key={data.id} className={styles.listCard}>
        <h3>
          {data.movie.title} <span>{data.rating}</span>
        </h3>
        <div className={styles.title}>
          <h2>{data.title}</h2>
          <span>{data.createAt.toLocaleDateString()}</span>
        </div>
        <div className={styles.content}>
          <p>
            <strong>quotes</strong>
            <span>{data.quotes}</span>
          </p>
          <p>
            <strong>storyline</strong>
            <span>{data.storyline}</span>
          </p>
          <p>
            <strong>review</strong>
            <span>{data.review}</span>
          </p>
        </div>
      </div>

      <div key={data.id} className={styles.listCard}>
        <h3>
          {data.movie.title} <span>{data.rating}</span>
        </h3>
        <div className={styles.title}>
          <h2>{data.title}</h2>
          <span>{data.createAt.toLocaleDateString()}</span>
        </div>
        <div className={styles.content}>
          <p>
            <strong>quotes</strong>
            <span>{data.quotes}</span>
          </p>
          <p>
            <strong>storyline</strong>
            <span>{data.storyline}</span>
          </p>
          <p>
            <strong>review</strong>
            <span>{data.review}</span>
          </p>
        </div>
      </div>

      <div key={data.id} className={styles.listCard}>
        <h3>
          {data.movie.title} <span>{data.rating}</span>
        </h3>
        <div className={styles.title}>
          <h2>{data.title}</h2>
          <span>{data.createAt.toLocaleDateString()}</span>
        </div>
        <div className={styles.content}>
          <p>
            <strong>quotes</strong>
            <span>{data.quotes}</span>
          </p>
          <p>
            <strong>storyline</strong>
            <span>{data.storyline}</span>
          </p>
          <p>
            <strong>review</strong>
            <span>{data.review}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
