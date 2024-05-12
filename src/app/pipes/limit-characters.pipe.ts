import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "limitCharacters",
  standalone: true,
})
export class LimitCharactersPipe implements PipeTransform {
  transform(value: string, limit: number): string {
    return value.length > limit ? value.substring(0, limit) + "..." : value;
  }
}
