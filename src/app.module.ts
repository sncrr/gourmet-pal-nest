import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { UserController } from './modules/user/user.controller';
import { RecipeModule } from './modules/recipe/recipe.module';
import { IngredientModule } from './ingredient/ingredient.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,

    UserModule,
    RecipeModule,
    IngredientModule
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
