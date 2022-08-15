import { LanguageValidator } from './language-validator';
import { ApiProperty } from '@quick-toolkit/http';
import { Typed } from '@quick-toolkit/class-transformer';

export class UserDetailsValidator extends LanguageValidator {
  @ApiProperty({
    in: 'path',
  })
  @Typed(String, {
    required: true,
  })
  public id: string;
}
