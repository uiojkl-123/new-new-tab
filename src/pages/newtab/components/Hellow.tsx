import '@pages/newtab/components/hellow.scss';

export const Hellow = () => {
  const hellowText = () => {
    const now = new Date();
    const hour = now.getHours();

    return hour <= 10 ? 'Good Morning ' : hour <= 17 ? 'Good Afternoon ' : 'Good Evening ';
  };

  return <div className="hellow">{hellowText()}</div>;
};
