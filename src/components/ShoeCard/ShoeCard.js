import React from "react";
import styled from "styled-components/macro";

import { COLORS, WEIGHTS } from "../../constants";
import { formatPrice, pluralize, isNewShoe } from "../../utils";
import Spacer from "../Spacer";

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  const onSale = variant === "on-sale";

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price style={{ textDecoration: onSale ? "line-through" : "none" }}>
            {formatPrice(price)}
          </Price>
          {onSale ? <SalePrice>{formatPrice(price * 0.75)}</SalePrice> : ""}
        </Row>
        <Row>
          <ColorInfo>{pluralize("Color", numOfColors)}</ColorInfo>
        </Row>
        {onSale ? (
          <ShowcaseLabelSale>Sale</ShowcaseLabelSale>
        ) : variant === "new-release" ? (
          <ShowcaseLabelNew>Just Released!</ShowcaseLabelNew>
        ) : (
          ""
        )}
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  flex: 1 1 300px;
`;

const Wrapper = styled.article`
  display: flex;
  position: relative;
  flex-direction: column;
  margin-bottom: 64px;
`;

const ImageWrapper = styled.div`
  position: relative;
  border-radius: 16px 16px 4px 4px;
  overflow: hidden;
`;

const Image = styled.img`
  display: block;
  max-width: 100%;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  font-weight: 500;
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  position: absolute;
  bottom: 0.1rem;
  right: 0;
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

const ShowcaseLabel = styled.p`
  display: block;
  position: absolute;
  width: max-content;
  top: 10px;
  right: 0;
  color: white;
  padding: 7px 9px 9px 11px;
  border-radius: 2px;
  font-weight: 700;
  margin-right: -3px;
`;

const ShowcaseLabelSale = styled(ShowcaseLabel)`
  background-color: ${COLORS.primary};
`;

const ShowcaseLabelNew = styled(ShowcaseLabel)`
  background-color: ${COLORS.secondary};
`;

export default ShoeCard;
