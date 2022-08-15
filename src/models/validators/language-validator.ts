import { ApiProperty } from '@quick-toolkit/http';
import { Typed } from '@quick-toolkit/class-transformer';

export class LanguageValidator {
  @ApiProperty({
    in: 'path',
    required: true,
  })
  @Typed(String, {
    required: true,
    rules: {
      type: 'Enum',
      enums: ['zh_CN', 'zh_HK', 'en_US'],
    },
  })
  public language: 'zh_CN' | 'zh_HK' | 'en_US';
}
