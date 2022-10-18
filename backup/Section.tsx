import { ReactNode } from 'react';

type SectionProps = {
  children: ReactNode;
};

type SectionHeaderProps = {
  title: string;
  onClick?: () => void;
  onClickText?: string;
};

const defaultSectionHeaderProps = {
  onClick: null,
  onClickText: '',
};

const Section = ({ children }: SectionProps) => (
  <div className="section">{children}</div>
);

const Header = ({ title, onClick, onClickText }: SectionHeaderProps) => (
  <div className="section-header">
    <h3 className="mb-0">{title}</h3>
    {onClick && (
      <a href="#javascript" onClick={onClick}>
        {onClickText}
      </a>
    )}
  </div>
);

Header.defaultProps = defaultSectionHeaderProps;

const SectionObject = Object.assign(Section, { Header });

export default SectionObject;
