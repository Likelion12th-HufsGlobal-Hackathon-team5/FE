import React from 'react';
import { useNavigate } from 'react-router-dom';
import routes from '../routes';
import styled from '@emotion/styled';
import SiteButton from '../components/siteButton';

const Container = styled.div`
  /* 스타일 규칙 추가 */
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SiteMap = () => {
  const navigate = useNavigate();

  const elements = routes
    .filter((route) => route.name)
    .map((route) => (
      <SiteButton
        key={route.path}
        text={route.name}
        onClick={() => {
          navigate(route.samplePath || route.path);
        }}
      />
    ));

  return <Container>{elements}</Container>;
};

export default SiteMap;
