#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
COPY --chown=app:app . .
RUN chmod -R 755 /app
EXPOSE 5000
EXPOSE 5001

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["Webapi/Webapi.csproj", "Webapi/"]
RUN dotnet restore "./Webapi/Webapi.csproj"
COPY . .
WORKDIR "/src/Webapi"
RUN dotnet build "./Webapi.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./Webapi.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
VOLUME ["/app/Storage"]
VOLUME ["/app/App_Data/Storage"]
ENTRYPOINT ["dotnet", "Webapi.dll"]
