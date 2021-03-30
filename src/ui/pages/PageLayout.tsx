import styled from "styled-components"
import { PageNav } from "ui/layout"

export const StyledPageWrapper = styled.div`
  padding: 2rem 2rem;
`
type Props = {
  children: React.ReactNode
}

export const PageLayout = (props: Props) => {
  return (
    <>
      <StyledPageWrapper>
        <PageNav />
        {props.children}
      </StyledPageWrapper>
    </>
  )
}
