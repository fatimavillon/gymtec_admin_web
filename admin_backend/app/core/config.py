from pathlib import Path
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    port: int = 8001
    data_dir: Path = Path("./data")
    models_dir: Path = Path("./models_artifacts")
    allow_origins: str = "http://localhost:3000,http://127.0.0.1:3000"

    @property
    def origins_list(self) -> list[str]:
        return [o.strip() for o in self.allow_origins.split(",")]

    class Config:
        env_file = ".env"


settings = Settings()