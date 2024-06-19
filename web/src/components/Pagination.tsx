import { Pagination } from "react-bootstrap";

export function Paginate({
  total,
  current,
  onChange,
}: {
  total: number;
  current: number;
  onChange: (value: number) => void;
}) {
  let items = [];

  if (current > 1) {
    items.push(
      <Pagination.Prev key="prev" onClick={() => onChange(current - 1)} />
    );
  }

  const startPage = Math.max(1, current - 2);
  const endPage = Math.min(total, current + 2);

  if (startPage > 1) {
    items.push(
      <Pagination.Item key={1} onClick={() => onChange(1)}>
        1
      </Pagination.Item>
    );
    if (startPage > 2) {
      items.push(<Pagination.Ellipsis key="start-ellipsis" disabled />);
    }
  }

  for (let page = startPage; page <= endPage; page++) {
    items.push(
      <Pagination.Item
        key={page}
        active={page === current}
        onClick={() => onChange(page)}
      >
        {page}
      </Pagination.Item>
    );
  }

  if (endPage < total) {
    if (endPage < total - 1) {
      items.push(<Pagination.Ellipsis key="end-ellipsis" disabled />);
    }
    items.push(
      <Pagination.Item key={total} onClick={() => onChange(total)}>
        {total}
      </Pagination.Item>
    );
  }

  if (current < total) {
    items.push(
      <Pagination.Next key="next" onClick={() => onChange(current + 1)} />
    );
  }

  return (
    <Pagination>
      {items}
    </Pagination>
  );
}
