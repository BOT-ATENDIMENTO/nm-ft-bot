import { Container, Links, Content } from "./styles";
import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import { Section } from "../../components/Section";
import { Tag } from "../../components/Tag";
import { ButtonText } from "../../components/ButtonText";

export function Details() {
  return (
    <Container>
      <Header />
      <main>
        <Content>
          <ButtonText title="exclui nota" />
          <h1>
            Instrodução ao react
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque in impedit beatae vitae aliquid eius esse hic. Ut sapiente veritatis laudantium cupiditate soluta iure molestiae inventore, consequatur non assumenda quos! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia dignissimos ipsum, excepturi, dolores suscipit beatae totam modi provident eveniet debitis vitae odio, at reiciendis labore aliquam. Molestiae doloremque sit iste. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat dignissimos laudantium nisi accusantium nobis quam eos, hic quod veniam error, nihil id cum? Excepturi vitae similique doloremque velit, voluptatum tempora!
          </p>
          <Section title="Links Úteis">
            <Links>
              <li>
                <a href="#">http://relatorios.grupoviamais.com/ViamaisNew/</a>
              </li>
              <li>
                <a href="#">http://relatorios.grupoviamais.com/ViamaisNew/</a>
              </li>
            </Links>
          </Section>

          <Section title="Marcadores">
            <Tag title="express" />
            <Tag title="nodejs" />
          </Section>
          <Button title="Sair" />
        </Content>
      </main>

    </Container>
  )
}