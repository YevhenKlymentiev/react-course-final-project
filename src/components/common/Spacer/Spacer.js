function Spacer(props) {
  const { width, height } = props;
  const inlineStyles = {};

  if (width) inlineStyles.width =`${width}px`;
  if (height) inlineStyles.height =`${height}px`;

  return <div style={{...inlineStyles}} />;
}

export default Spacer;
