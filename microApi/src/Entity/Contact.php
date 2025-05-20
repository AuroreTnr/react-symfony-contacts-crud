<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\ContactRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;
use Symfony\Component\Validator\Constraints as Assert;

// CORE
// https://api-platform.com/docs/core/serialization/
// https://api-platform.com/docs/core/filters/
// https://api-platform.com/docs/core/pagination/

#[ORM\Entity(repositoryClass: ContactRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(normalizationContext: ['groups' => 'read:listContact']),
        new Get(normalizationContext: ['groups' => 'read:itemContact']),
        new Post(denormalizationContext: ['groups' => 'write:itemContact']),
        new Patch(denormalizationContext: ['groups' => 'write:itemContact']),
        new Put(denormalizationContext: ['groups' => 'write:itemContact']),
        new Delete()
    ],
    paginationItemsPerPage: 10
)]
#[ApiFilter(SearchFilter::class, properties: ['nom' => 'partial', 'prenom' => 'partial'])]
class Contact
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['read:listContact', 'read:itemContact'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    #[Assert\Length(min: 2)]
    #[Assert\Regex(pattern: "/^[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ' -]*$/")]
    #[Groups(['read:listContact', 'read:itemContact', 'write:itemContact'])]
    private ?string $nom = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    #[Assert\Length(min: 2)]
    #[Assert\Regex(pattern: "/^[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ' -]*$/")]
    #[Groups(['read:listContact', 'read:itemContact', 'write:itemContact'])]
    private ?string $prenom = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    #[Assert\Email(
        mode: 'strict'
    )]
    #[Groups(['read:listContact', 'read:itemContact', 'write:itemContact'])]
    private ?string $email = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): static
    {
        $this->nom = $nom;

        return $this;
    }

    public function getPrenom(): ?string
    {
        return $this->prenom;
    }

    public function setPrenom(string $prenom): static
    {
        $this->prenom = $prenom;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }
}
