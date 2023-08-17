type EntryCardProps = {
  entry: {
    createdAt: Date;
    analysis: {
      summary: string;
      mood: string;
    };
  };
};

const EntryCard = ({ entry }: EntryCardProps) => {
  const date = new Date(entry?.createdAt).toDateString();

  const { summary, mood } = entry?.analysis;

  return (
    <div className="overflow-hidden bg-white divide-y divide-gray-200 rounded-lg shadow">
      <div className="px-4 py-5 text-black sm:px-6">{date}</div>
      <div className="px-4 py-5 text-black sm:p-6">{summary}</div>
      <div className="px-4 py-4 text-black sm:px-6">{mood}</div>
    </div>
  );
};

export default EntryCard;
