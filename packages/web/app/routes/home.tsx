import type { Route } from "./+types/home";
import { useEffect, useRef, useState } from "react";
import { type ReadQuestion, readQuestionsWithOffset } from "db";
import { Virtuoso } from "react-virtuoso";
import { useFetcher, type ShouldRevalidateFunction } from "react-router";
import { CardWithScreentime } from "~/components/card/cardWithScreentime";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Eggl" }];
}

export const shouldRevalidate: ShouldRevalidateFunction = ({ formAction }) => {
  // loaderを再実行しない
  if (formAction === "/api/stat/screentime") {
    return false;
  }

  return true;
};

export async function loader({ request }: Route.LoaderArgs) {
  const limit = 10;

  const searchParams = new URL(request.url).searchParams;
  const offset = Number(searchParams.get("offset"));

  return await readQuestionsWithOffset(offset, limit);
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const [questions, setQuestions] = useState<ReadQuestion[]>(loaderData);
  const offset = useRef(0); // loader2重呼び出し防止用
  const fetcher = useFetcher<typeof loader>();

  const loadMore = async () => {
    if (fetcher.state !== "idle" || offset.current === questions.length) return;

    offset.current = questions.length;
    await fetcher.load(`?offset=${offset.current}`);
  };

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      setQuestions([...questions, ...fetcher.data]);
    }

    return () => {
      fetcher.reset();
    };
  }, [fetcher.data]);

  return (
    <Virtuoso
      className="snap-y snap-mandatory"
      data={questions}
      endReached={loadMore}
      style={{
        height: "100svh",
      }}
      itemContent={(_, data) => (
        <div className="w-full px-4">
          <div className="snap-center h-svh flex items-center justify-center">
            <div className="w-full max-w-md">
              <CardWithScreentime id={data.id} isQuestion title={data.question}>
                <ol className="list-[upper-alpha] list-inside">
                  <li>{data.optionA}</li>
                  <li>{data.optionB}</li>
                  <li>{data.optionC}</li>
                  <li>{data.optionD}</li>
                </ol>
              </CardWithScreentime>
            </div>
          </div>
          <div className="snap-center h-svh flex items-center justify-center">
            <div className="w-full max-w-md">
              <CardWithScreentime id={data.id} isQuestion title={data.question}>
                <p className="font-bold text-lg">{data.answer}</p>
                <p>{data.explanation}</p>
              </CardWithScreentime>
            </div>
          </div>
        </div>
      )}
    />
  );
}
