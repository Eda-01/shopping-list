import { Button } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";

interface IconButtonProps {
  onClick: () => void;
}

export default function IconButton({ onClick }: IconButtonProps) {
  return (
    <Button
      variant="danger"
      size="sm"
      className="d-flex justify-content-center align-items-center"
      style={{ width: "32px", height: "32px" }}
      onClick={onClick}
    >
      <Trash size={16} />
    </Button>
  );
}
