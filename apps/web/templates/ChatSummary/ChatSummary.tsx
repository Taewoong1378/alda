import { convertDateToYYYYMMDD, convertTimestampToDate } from '@util';

import { Header, Loading } from '@components';
import { AnswerBubble, QuestionBubble } from '@templates/Chat/components';

import { useGetProfile } from '@hooks';

export const ChatSummary = ({ date }: { date: string }) => {
  const { user } = useGetProfile();

  const chat = user?.emotionalChat.find(
    v => convertDateToYYYYMMDD(convertTimestampToDate(v.createdAt)) === date,
  );

  const emotion = user?.emotion.find(
    v => convertDateToYYYYMMDD(convertTimestampToDate(v.createdAt)) === date,
  );

  if (!chat || !emotion) return <Loading />;

  return (
    <>
      <Header title='Emotional Chat' />
      <div className='px-27'>
        <div className='pt-80'>
          <AnswerBubble
            answer={
              <div className='text-AX1-Subhead'>
                <div>
                  I felt&nbsp;
                  <span className='text-AX1-Subhead text-primary-100'>
                    {emotion.small.map((v, i) => {
                      if (i === emotion.small.length - 1) {
                        return v;
                      } else {
                        return v + ', ';
                      }
                    })}
                  </span>
                  &nbsp; among the {emotion.big?.toLowerCase()} feelings.
                </div>
              </div>
            }
          />
        </div>
        {!!chat.messages.length &&
          chat.messages.map((v, i) => {
            if (i % 2 === 0) {
              return (
                <div key={i} className='mt-31'>
                  <QuestionBubble
                    isMain={true}
                    question={<div className='text-AX1-Subhead'>{v.content}</div>}
                  />
                </div>
              );
            }

            return (
              <div key={i} className='mt-31'>
                <AnswerBubble answer={<div className='text-AX1-Subhead'>{v.content}</div>} />
              </div>
            );
          })}
      </div>
    </>
  );
};
