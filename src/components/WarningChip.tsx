export interface WarningChipProps {
  text: string;
}

export default function WarningChip({ text }: WarningChipProps) {
  return (
    <div className="warning-chip">
      <span aria-hidden="true">⚠</span>
      <p>{text}</p>
    </div>
  );
}
