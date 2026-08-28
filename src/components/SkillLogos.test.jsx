import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import {
  ReactLogo,
  Nextjs,
  Javascript,
  Typescript,
  Node,
  Git,
  Figma,
  Php,
  Mysql,
  Bootstrap,
  Css,
  Django,
  Html,
  MongoDB,
  PostgreSQL,
  Postman,
} from './SkillLogos'

const skillLogoComponents = {
  ReactLogo,
  Nextjs,
  Javascript,
  Typescript,
  Node,
  Git,
  Figma,
  Php,
  Mysql,
  Bootstrap,
  Css,
  Django,
  Html,
  MongoDB,
  PostgreSQL,
  Postman,
}

describe('SkillLogos', () => {
  it('exports exactly 16 skill-logo components', () => {
    expect(Object.keys(skillLogoComponents)).toHaveLength(16)
  })

  for (const [name, Component] of Object.entries(skillLogoComponents)) {
    it(`${name} renders an <img> with loading="lazy" and decoding="async"`, () => {
      const { container } = render(<Component />)
      const img = container.querySelector('img')
      expect(img).not.toBeNull()
      expect(img).toHaveAttribute('loading', 'lazy')
      expect(img).toHaveAttribute('decoding', 'async')
    })
  }
})
