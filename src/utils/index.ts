// Remove escape characters from a string
export const removeEscapeCharacters = (str: string) => {
  return str.replace(/\\/g, "");
};

export const otherUser = (session: any, id: string) => {
  return session?.user?.id !== id;
};

export const timeAgo = (date: string) => {
  const now = new Date();
  const postDate = new Date(date);
  const diffTime = Math.abs(now.getTime() - postDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays > 0) {
    return `${diffDays} days ago`;
  }
  const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
  return `${diffHours} hours ago`;
};
