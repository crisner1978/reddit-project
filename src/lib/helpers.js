export function getUpvotePercentage(votes) {
  const upvoteCount = Object.values(votes).reduce((acc, val) => {
    if (val === 1) {
      return (acc += 1);
    }
    return acc;
  }, 0);
  const totalVotes = Object.keys(votes).length;
  return totalVotes !== 0 ? Math.round((upvoteCount * 100) / totalVotes) : 0;
}

export function getPostScore(votes) {
    return Object.values(votes).reduce((acc, val) => (acc += val), 0);
}
