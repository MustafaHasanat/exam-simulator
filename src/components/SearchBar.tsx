import styles from './SearchBar.module.css';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  inputClassName?: string;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChange,
  className,
  inputClassName,
  placeholder = 'Search exams by name, provider, or level…',
}: SearchBarProps) {
  return (
    <div className={`${styles.wrap} ${className ?? ''}`}>
      <svg className={styles.icon} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <input
        className={`${styles.input} ${inputClassName ?? ''}`}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
        spellCheck="false"
      />
      {value && (
        <button className={styles.clear} onClick={() => onChange('')} aria-label="Clear search">
          ✕
        </button>
      )}
    </div>
  );
}
