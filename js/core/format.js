export const formatTime = time =>
  time ? time.slice(0, 5) : '-';

export const formatTimeRange = (start, end) =>
  `${formatTime(start)} – ${formatTime(end)}`;

