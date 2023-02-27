/*global gtag*/

export const pageview = (url: string) => {
  window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
    page_path: url,
  });
};

export const event = ({ category, label }: { category: string; label: string }) => {
  window.gtag('event', 'click', {
    event_category: category,
    event_label: label,
  });
};
